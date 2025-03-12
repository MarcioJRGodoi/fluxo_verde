import { Alert } from "react-native";

export const confirmDeletion = (title: string, message: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        Alert.alert(
            title,
            message,
            [
                {
                    text: 'Cancelar',
                    onPress: () => reject('cancelado'),
                    style: 'cancel',
                },
                { text: 'Confirmar', onPress: () => resolve(true) },
            ],
            { cancelable: false }
        );
    });
};