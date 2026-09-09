'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp, Banknote, CreditCard, Truck } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { cn } from '@/src/shared/lib/utils';
import { Order, OrderStatus, OrderPaymentStatus } from '../types/order';

// ─── Status badge config ──────────────────────────────────────────────────────

const ORDER_STATUS_STYLES: Record<OrderStatus, string> = {
    PENDING:    'bg-ds-warning-faint text-ds-text-warning border-ds-border-warning-faint',
    CONFIRMED:  'bg-ds-info-faint text-ds-text-info border-ds-border-info-faint',
    PROCESSING: 'bg-ds-info-faint text-ds-text-info border-ds-border-info-faint',
    SHIPPED:    'bg-ds-primary-faint text-ds-text-primary border-ds-border-primary-faint',
    DELIVERED:  'bg-ds-success-faint text-ds-text-success border-ds-border-success-faint',
    CANCELLED:  'bg-ds-danger-faint text-ds-text-danger border-ds-border-danger-faint',
};

const PAYMENT_STATUS_STYLES: Record<OrderPaymentStatus, string> = {
    PENDING:    'bg-ds-warning-faint text-ds-text-warning',
    PROCESSING: 'bg-ds-info-faint text-ds-text-info',
    PAID:       'bg-ds-success-faint text-ds-text-success',
    FAILED:     'bg-ds-danger-faint text-ds-text-danger',
    REFUNDED:   'bg-ds-primary-faint text-ds-text-primary',
};

function StatusBadge({ label, className }: { label: string; className: string }) {
    return (
        <span className={cn('inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-semibold', className)}>
            {label}
        </span>
    );
}

// ─── Order item row ───────────────────────────────────────────────────────────

function OrderItemRow({ item }: { item: Order['orderItems'][number] }) {
    const format = useFormatter();

    return (
        <div className="flex items-center gap-3 rounded-xl bg-ds-plain p-3">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-lg sm:size-20">
                <Image
                    src={item.product.cover || '/placeholder.png'}
                    alt={item.product.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                />
            </div>
            <div className="flex flex-1 flex-col gap-1 min-w-0">
                <p className="truncate text-sm font-semibold text-ds-text-primary sm:text-base">
                    {item.product.title}
                </p>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-ds-text-secondary">×{item.quantity}</span>
                    <span className="text-sm font-bold text-ds-text-plain">
                        {format.number(Number(item.price))} EGP
                    </span>
                </div>
            </div>
        </div>
    );
}

// ─── Main card ────────────────────────────────────────────────────────────────

const PREVIEW_COUNT = 2;

export default function OrderCard({ order }: { order: Order }) {
    const t = useTranslations('orders');
    const format = useFormatter();
    const [expanded, setExpanded] = useState(false);

    const items = order.orderItems ?? [];
    const hasMore = items.length > PREVIEW_COUNT;
    const visibleItems = expanded ? items : items.slice(0, PREVIEW_COUNT);

    const formattedDate = order.createdAt
        ? format.dateTime(new Date(order.createdAt), { dateStyle: 'medium', timeStyle: 'short' })
        : '—';

    return (
        <article className="overflow-hidden rounded-2xl border border-ds-border-muted bg-ds-subtle shadow-ds-subtle">
            {/* ── Header ── */}
            <div className="flex flex-col gap-1 bg-ds-primary px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-semibold text-white text-sm truncate">
                    {t('order-header')} <span className="opacity-75">#{order.id.slice(0, 8)}…</span>
                </p>
                <p className="text-xs text-white/70">{formattedDate}</p>
            </div>

            {/* ── Body ── */}
            <div className="p-4 space-y-4">
                {/* Total + status row */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-medium text-ds-text-soft">{t('total-price')}</span>
                        <span className="text-xl font-bold text-ds-text-plain">
                            {format.number(Number(order.total))}
                        </span>
                        <span className="text-sm text-ds-text-muted">EGP</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <StatusBadge
                            label={t(order.status.toLowerCase() as any)}
                            className={ORDER_STATUS_STYLES[order.status]}
                        />
                        <StatusBadge
                            label={t(order.paymentStatus === 'PAID' ? 'paid' : 'not-paid')}
                            className={PAYMENT_STATUS_STYLES[order.paymentStatus]}
                        />
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-ds-border-muted" />

                {/* Meta info */}
                <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1.5 text-ds-text-default">
                        {order.paymentMethod === 'CREDIT_CARD'
                            ? <CreditCard className="size-4 text-ds-text-primary" />
                            : <Banknote className="size-4 text-ds-text-primary" />
                        }
                        <span>
                            {order.paymentMethod === 'CREDIT_CARD' ? t('credit-card') : t('cash')}
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-ds-text-default">
                        <Truck className="size-4 text-ds-text-primary" />
                        <span>{t(order.status === 'DELIVERED' ? 'delivered' : 'pending')}</span>
                    </div>
                </div>

                {/* Order items */}
                <div className="space-y-2">
                    <p className="text-sm font-semibold text-ds-text-default">{t('order-items')}</p>

                    <div className="grid gap-2 sm:grid-cols-2">
                        {visibleItems.map((item) => (
                            <OrderItemRow key={item.id} item={item} />
                        ))}
                    </div>

                    {hasMore && (
                        <button
                            type="button"
                            onClick={() => setExpanded((v) => !v)}
                            className="flex items-center gap-1 text-sm font-medium text-ds-text-primary hover:underline mt-1"
                        >
                            {expanded ? (
                                <><ChevronUp className="size-4" />{t('show-less')}</>
                            ) : (
                                <><ChevronDown className="size-4" />{t('show-all')} ({items.length - PREVIEW_COUNT} {t('more')})</>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
}
