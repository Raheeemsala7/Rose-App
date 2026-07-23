"use client"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import { signIn } from 'next-auth/react';
import { LoginFormType, loginSchema } from '../schemas/login.schema';

export function useLogin(callbackUrl?: string) {
    const t = useTranslations('login');
    const tButton = useTranslations('button');
    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<LoginFormType>({
        resolver: zodResolver(loginSchema(t)),
        defaultValues: {
            username: '',
            password: '',
            rememberMe: false,
        },
    });
    async function onSubmit(data: LoginFormType) {
        try {
            const loginResponse = await signIn('credentials', {
                username: data.username,
                password: data.password,
                redirect: false,
            });
            if (!loginResponse?.ok) {
                setError('root', {
                    type: 'server',
                    message: loginResponse?.error ?? t('unknownError'),
                });
                return;
            }
            const destination = callbackUrl || '/';
            window.location.href = destination;
        } catch (error) {
            setError('root', {
                type: 'server',
                message: t('somethingWentWwrong'),
            });
        }
    }
    return {
        handleSubmit,
        control,
        errors,
        isSubmitting,
        onSubmit,
        t,
        tButton,
    };
}