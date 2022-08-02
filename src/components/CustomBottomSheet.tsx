import React, { ReactNode, useMemo } from 'react';
import {
    BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { SheetBackdrop } from './';
interface Props {
    children:ReactNode
}
const CustomBottomSheet = React.forwardRef<BottomSheetModal,Props>((props,ref) => {
 
    const snapPoints = useMemo(() => ['25%', '50%'], []);
        
    return (
        <BottomSheetModal
            ref={ref}
            index={1}
            backdropComponent={SheetBackdrop}
            snapPoints={snapPoints}
        >
            {props.children} 
        </BottomSheetModal>
    );
})

export default CustomBottomSheet;