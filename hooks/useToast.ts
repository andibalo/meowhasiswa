import { useToastController } from "@tamagui/toast";


export const useToast = () => {

    const toast = useToastController()

    const showToastError = (title: string, message?: string) => {
        toast.show(title, {
            message,
            customData: {
                theme: "red"
            }
        })
    }

    const showToastWarn = (title: string, message?: string) => {
        toast.show(title, {
            message,
            customData: {
                theme: "yellow"
            }
        })
    }

    const showToast = (title: string) => {
        toast.show(title)
    }

    return {
        showToastError,
        showToast,
        showToastWarn
    }
};