import { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } from 'discord.js';

const service_providers = [
    {
        labeL: 'Mobitel',
        description: '71 - 70',
        value: 'mobitel'
    },
    {
        labeL: 'Dialog',
        description: '76 - 77 - 74',
        value: 'dialog'
    },
    {
        labeL: 'Hutch',
        description: '72 - 78',
        value: 'hutch'
    },
    {
        labeL: 'Airtel',
        description: '75',
        value: 'airtel'
    }
] as const

export const card_providers = [
    {
        labeL: 'Visa',
        description: 'Visa Debit',
        value: 'visa_debit'
    },
    {
        labeL: 'Visa',
        description: 'Visa Credit',
        value: 'visa_credit'
    },
    {
        labeL: 'Visa',
        description: 'Visa Credit (Gold)',
        value: 'visa_credit_gold'
    },
    {
        labeL: 'Visa',
        description: 'Visa Debit (Gold)',
        value: 'visa_debit_gold'
    },
    {
        labeL: 'Visa',
        description: 'Visa Credit (Platinum)',
        value: 'visa_credit_platinum'
    },
    {
        labeL: 'Visa',
        description: 'Visa Debit (Platinum)',
        value: 'visa_debit_platinum'
    },
    {
        labeL: 'MasterCard',
        description: 'MasterCard Standard',
        value: 'master'
    },
    {
        labeL: 'MasterCard Gold',
        description: 'MasterCard Gold',
        value: 'master_gold'
    },
    {
        labeL: 'American Express',
        description: 'AMEXP Credit',
        value: 'aexpress_credit'
    },
    {
        labeL: 'American Express',
        description: 'AMEXP Debit',
        value: 'aexpress_debit'
    },
    {
        labeL: 'Discover',
        description: 'Discover Credit',
        value: 'discover_credit'
    },
    {
        labeL: 'Discover',
        description: 'Discover Debit',
        value: 'discover_debit'
    }
] as const

export type isp_types = typeof service_providers[number]['value']
export type card_types = typeof card_providers[number]['value']

export const service_providers_id = 'isp_select_menu'
export const card_providers_id = 'card_select_menu'

export const ISP_Select_Menu = () => {
    const select_menu = new StringSelectMenuBuilder()
    .setCustomId(service_providers_id)
    .setPlaceholder('Select ISP')
    .setMinValues(1)
    .setMaxValues(1)
    .addOptions(service_providers.map(({ labeL, value, description }) => {
        return new StringSelectMenuOptionBuilder()
            .setLabel(labeL)
            .setValue(value)
            .setDescription(description)
    }))
    
    return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select_menu)
}

export const CARD_Select_Menu = () => {
    const select_menu = new StringSelectMenuBuilder()
    .setCustomId(card_providers_id)
    .setPlaceholder('Select BIN')
    .setMinValues(1)
    .setMaxValues(1)
    .addOptions(card_providers.map(({ labeL, value, description }) => {
        return new StringSelectMenuOptionBuilder()
            .setLabel(labeL)
            .setValue(value)
            .setDescription(description)
    }))
    
    return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select_menu)
}
