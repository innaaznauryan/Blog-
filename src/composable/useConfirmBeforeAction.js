import Confirm from "@/components/Confirm.vue"
import { createConfirmDialog } from "vuejs-confirm-dialog"

export const useConfirmBeforeAction = (action, props) => {
    const { reveal, onConfirm } = createConfirmDialog(Confirm, props)
    onConfirm(action)
    reveal()
}