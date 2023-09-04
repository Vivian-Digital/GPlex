import { EmbedBuilder, StringSelectMenuInteraction } from 'discord.js';
import { card_providers, card_providers_id, card_types, isp_types, service_providers_id } from './select-menu.js';
import { ISPGen } from '../../algorithms/isp.js';
import { CardData } from '../../algorithms/cards.js';
import { EMBED_DATA } from '../../../config/config.js';

type customIDS = typeof service_providers_id | typeof card_providers_id

export const SelectMenuCollector = async (interaction: StringSelectMenuInteraction) => {
    if (!interaction.values.length) {
        await interaction.reply({
            content: 'Please Select at least 1 entry'
        })
        return
    }

    switch (interaction.customId as customIDS) {
        case 'isp_select_menu': {
            const isp = (interaction.values as isp_types[])[0]
            const result = ISPGen[isp]()
        
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor('Green')
                    .addFields({
                        'name': `${ isp[0].toUpperCase() }${ isp.slice(1) }`,
                        'value': result.join('\n')
                    })
                    .setTimestamp()
                    .setFooter({
                        text: 'GPlex',
                        iconURL: EMBED_DATA.ICONS.GREEN_SHIELD
                    })
                ],
                ephemeral: true
            })
            return
        }
        case 'card_select_menu': {
            const card_type = (interaction.values as card_types[])[0]
            const result = CardData(card_type)

            const card_name = card_providers.find(card => card.value === card_type )

            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setTitle(card_name?.description ?? 'Card')
                    .setColor('Green')
                    .addFields(
                        {
                            'name': '`Number`',
                            'value': result.map((item) => `\`${ item[0] }\``).join('\n'),
                            'inline': true
                        },
                        {
                            'name': '`CVV`',
                            'value': result.map((item) => `\`${ item[1] }\``).join('\n'),
                            'inline': true
                        },
                        {
                            'name': '`Expire`',
                            'value': result.map((item) => `\`${ item[2] }\``).join('\n'),
                            'inline': true
                        }
                    )
                    .setTimestamp()
                    .setFooter({
                        text: 'GPlex',
                        iconURL: EMBED_DATA.ICONS.GREEN_SHIELD
                    })
                ],
                ephemeral: true
            })
            return
        }
    }
}
