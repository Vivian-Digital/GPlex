import { TlocalCommand } from 'Instance-Types';
import { Client, ApplicationCommandOptionType, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder, CommandInteractionOption } from 'discord.js';
import { FileDirName } from '../../utils/filedirname.js';
import { DirectCardData } from '../../algorithms/cards.js';
import { EMBED_DATA } from '../../../config/config.js';

const { __exactname } = FileDirName(import.meta)

const Function: TlocalCommand = {
    name: __exactname,
    description: 'Generate Card Numbers',
    deleted: false,
    authorized: true,
    options: [
        {
            name: 'bin',
            description: 'Bank Identification Number',
            required: true,
            type: ApplicationCommandOptionType.Number
        }
    ],
    permissionsRequired: [
        PermissionFlagsBits.Administrator
    ],
    
    callback: async (Instance: Client<true>, interaction: ChatInputCommandInteraction) => {
        const bin = (interaction.options.get('bin') as CommandInteractionOption)

        const custom_bin: number[] = []
        for (const char of String(bin.value)) {
            custom_bin.push(parseInt(char))
        }

        const result = DirectCardData(custom_bin)
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
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
    }
}

export default Function
