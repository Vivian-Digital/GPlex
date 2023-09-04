import { ButtonInteraction, ChatInputCommandInteraction, Client, StringSelectMenuInteraction } from 'discord.js';
import InteractionCommandHandler from '../../handlers/interactionHandler/InteractionCommandHandler.js';
import { SelectMenuCollector } from '../../handlers/selectMenuHandler/collecter.js';
import SlashCommandHandler from '../../handlers/chatInputCommandHandler/slashCommandHandler.js';

export default async (Instance: Client<true>, interaction: ButtonInteraction | StringSelectMenuInteraction | ChatInputCommandInteraction) => {
    if (interaction.isStringSelectMenu()) {
        await SelectMenuCollector(interaction)
    } else if (interaction.isButton()) {
        await InteractionCommandHandler(Instance, interaction)
    } else if (interaction.isChatInputCommand()) {
        await SlashCommandHandler(Instance, interaction)
    }
}
