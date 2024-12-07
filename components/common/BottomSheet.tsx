import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { forwardRef, useCallback } from 'react';


interface BottomSheetProps {
    children: React.ReactNode;
}

export const BottomSheet = forwardRef<BottomSheetModal, BottomSheetProps>((props, ref) => {

    const renderBackdrop = useCallback(
        (props) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
            />
        ),
        []
    );

    return (
        <BottomSheetModal
            ref={ref}
            backdropComponent={renderBackdrop}
        >
            <BottomSheetView>
                {props.children}
            </BottomSheetView>
        </BottomSheetModal>
    );
});
