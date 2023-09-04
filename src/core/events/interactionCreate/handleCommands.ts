import { ButtonInteraction, Client, StringSelectMenuInteraction } from 'discord.js';
import InteractionCommandHandler from '../../handlers/interactionHandler/InteractionCommandHandler.js';
import { SelectMenuCollector } from '../../handlers/selectMenuHandler/collecter.js';

export default async (Instance: Client<true>, interaction: ButtonInteraction | StringSelectMenuInteraction) => {
    if (interaction.isStringSelectMenu()) {
        await SelectMenuCollector(interaction)
    } if (interaction.isButton()) {
        await InteractionCommandHandler(Instance, interaction)
    }
}
