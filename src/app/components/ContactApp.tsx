"use client";

import type { ChangeEvent, FormEvent, ReactNode } from "react";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { IconSend, IconSparkles } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

import { emailValidation } from "libs/helpers/emailValidation";
import type { ContactAppProps } from "libs/interfaces/user";

interface FieldProps {
  children: ReactNode;
  label: string;
  required?: boolean;
}

function Field({ children, label, required }: FieldProps) {
  return (
    <Stack spacing={0.5}>
      <Typography color="text.primary" fontWeight={500} variant="body2">
        {label}
        {required ? (
          <Typography color="error.main" component="span" variant="body2">
            {" *"}
          </Typography>
        ) : null}
      </Typography>
      {children}
    </Stack>
  );
}

export default function ContactApp({ recipientEmail }: ContactAppProps) {
  const [form, setForm] = useState({
    company: "",
    email: "",
    message: "",
    name: "",
    subject: "",
  });
  const [feedback, setFeedback] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);
  const [isSending, setIsSending] = useState(false);
  const sendingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (sendingTimeoutRef.current) {
        clearTimeout(sendingTimeoutRef.current);
      }
    };
  }, []);

  const onFieldChange =
    (field: keyof typeof form) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.subject || !form.message) {
      setFeedback({
        message: "Please fill all required fields before sending.",
        type: "error",
      });

      return;
    }

    const emailError = emailValidation(form.email);

    if (emailError) {
      setFeedback({
        message: emailError,
        type: "error",
      });

      return;
    }

    const emailBody = [
      `${form.company && `Company: ${form.company}`}`,
      "",
      form.message,
    ].join("\n");
    const encodedSubject = encodeURIComponent(form.subject);
    const encodedBody = encodeURIComponent(emailBody);

    setIsSending(true);
    window.location.href = `mailto:${recipientEmail}?subject=${encodedSubject}&body=${encodedBody}`;
    setFeedback({
      message: "Your email draft has been prepared in your mail client.",
      type: "success",
    });

    sendingTimeoutRef.current = setTimeout(() => {
      setIsSending(false);
      sendingTimeoutRef.current = null;
    }, 1500);
  };

  return (
    <Stack component="form" spacing={2} onSubmit={onSubmit}>
      <Stack
        spacing={0.75}
        sx={{
          backgroundColor: "rgba(0, 122, 51, 0.06)",
          border: "1px dashed",
          borderColor: "success.main",
          borderRadius: 2,
          p: 2,
        }}
      >
        <Stack alignItems="flex-center" direction="row" spacing={1}>
          <Box
            sx={{
              alignItems: "center",
              color: "success.main",
              display: "flex",
            }}
          >
            <IconSparkles size={24} />
          </Box>
          <Typography color="text.primary" fontWeight={"bold"} variant="body1">
            Interested in hiring me?
          </Typography>
        </Stack>
        <Typography color="text.secondary" variant="body2">
          Whether it&apos;s a full-time role, a freelance project, or just a
          friendly hello - leave me a note. I read every message and try to
          reply within a couple of days.
        </Typography>
        <Typography color="text.secondary" variant="caption">
          Replies go to {recipientEmail}
        </Typography>
      </Stack>

      <Field required label="Your name">
        <TextField
          placeholder="Enter your name"
          size="small"
          value={form.name}
          onChange={onFieldChange("name")}
        />
      </Field>

      <Field required label="Your email">
        <TextField
          error={Boolean(form.email) && Boolean(emailValidation(form.email))}
          helperText={
            form.email && emailValidation(form.email)
              ? emailValidation(form.email)
              : " "
          }
          placeholder="name@example.com"
          size="small"
          type="email"
          value={form.email}
          onChange={onFieldChange("email")}
        />
      </Field>

      <Field label="Company">
        <TextField
          placeholder="Your company (optional)"
          size="small"
          value={form.company}
          onChange={onFieldChange("company")}
        />
      </Field>

      <Field required label="Subject">
        <TextField
          placeholder="What is this about?"
          size="small"
          value={form.subject}
          onChange={onFieldChange("subject")}
        />
      </Field>

      <Field required label="Message">
        <TextField
          multiline
          minRows={5}
          placeholder="Tell me what you would like to discuss"
          value={form.message}
          onChange={onFieldChange("message")}
        />
      </Field>

      {feedback ? (
        <Typography
          color={feedback.type === "success" ? "success.main" : "error.main"}
          variant="body2"
        >
          {feedback.message}
        </Typography>
      ) : null}

      <Stack direction="row" justifyContent="flex-end">
        <Button
          color="primary"
          endIcon={<IconSend size={16} />}
          loading={isSending}
          loadingPosition="end"
          type="submit"
          variant="contained"
        >
          Let&apos;s talk
        </Button>
      </Stack>
    </Stack>
  );
}
