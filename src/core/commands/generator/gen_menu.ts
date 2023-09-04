import { TlocalCommand } from 'Instance-Types';
import { Client, PermissionFlagsBits, ChatInputCommandInteraction, ActionRowBuilder, ButtonBuilder } from 'discord.js';
import { FileDirName } from '../../utils/filedirname.js';
import { InteractionButtons } from '../../events/ready/[03]-Interactions.js';

const { __exactname } = FileDirName(import.meta)

const Function: TlocalCommand = {
    name: __exactname,
    description: 'Gen Menu',
    deleted: false,
    authorized: true,
    permissionsRequired: [
        PermissionFlagsBits.Administrator
    ],
    
    callback: async (Instance: Client<true>, interaction: ChatInputCommandInteraction) => {
        const row = new ActionRowBuilder<ButtonBuilder>()
        /* Create Tiket Buttons */
        InteractionButtons.forEach(({ id, label, style }) => {
            row.components.push(
                new ButtonBuilder()
                .setCustomId(id)
                .setLabel(label)
                .setStyle(style)
            )
        })

        await interaction.reply({
            components: [row],
            ephemeral: true
        })
    }
}

export default Function
