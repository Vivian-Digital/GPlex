import { ChatInputCommandInteraction, Client } from 'discord.js';
import getLocalCommands from '../../utils/getLocalCommands.js';

/* Default Slash Command Handler */
export default async (Instance: Client<true>, interaction: ChatInputCommandInteraction) => {
    /* get local commands */
    const localCommands = await getLocalCommands()

    try {
        /* find command */
        const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName)
        /* the command handler not exists */
        if (!commandObject) { return }

        /* check if the user has enough permission to run this command */
        if (commandObject.permissionsRequired?.length) {
            for (const permission of commandObject.permissionsRequired) {
                if (!interaction.memberPermissions?.has(permission)) {
                    await interaction.reply({
                        content: 'Not Enough Permissions!',
                        ephemeral: true
                    })
                    return
                }
            }
        }

        /* execute command */
        await commandObject.callback(Instance, interaction)

    } catch (error) {
        console.log(`There was an error running this command ${ (error as Error).message }`)
    }
}
