import { Dialog, type DialogProps, DialogTitle } from "@mui/material";
import { IconX } from "@tabler/icons-react";
import { type ReactNode } from "react";
import { useTranslation } from "react-i18next";

import DialogCloseButton from "./DialogCloseButton";

interface Props {
  open: boolean;
  setOpen: CallableFunction;
  title: string;
  children: ReactNode;
  isNoTitle?: boolean;
}
export default function Modal({
  open,
  setOpen,
  title,
  children,
  isNoTitle = false,
  ...props
}: Props & DialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      scroll="body"
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
      onClose={() => setOpen(false)}
      {...props}
    >
      <DialogCloseButton disableRipple onClick={() => setOpen(false)}>
        <IconX />
      </DialogCloseButton>
      {!isNoTitle ? (
        <DialogTitle fontWeight={700} variant="h6">
          {t(title)}
        </DialogTitle>
      ) : null}
      {children}
    </Dialog>
  );
}
