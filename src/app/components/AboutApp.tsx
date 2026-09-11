import { Avatar, Box, Chip, Divider, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { IconMapPin, IconMoodWink } from "@tabler/icons-react";
import { Fragment } from "react";
import getCompanyPeriod from "libs/helpers/getCompanyPeriod";

import formatPeriodDuration from "libs/helpers/formatPeriodDuration";
import {
  EXPERIENCES,
  COMPANY_LOGO_SIZE,
  TIMELINE_DOT_SIZE,
  TIMELINE_LINE_WIDTH,
  TIMELINE_TOP_OFFSET,
} from "libs/constants/user";

export default function AboutApp() {
  return (
    <Stack spacing={0}>
      <Box
        sx={{
          overflow: "hidden",
        }}
      >
        <Box
          alt="Adaptability quote by Leon C. Megginson"
          component="img"
          src="/banner.jpeg"
          sx={{
            aspectRatio: "4 / 1",
            display: "block",
            objectFit: "cover",
            width: "100%",
          }}
        />
        <Stack alignItems="flex-start" sx={{ px: { xs: 2, sm: 3 } }}>
          <Avatar
            alt="Naufal Ardhi"
            src="/naufal.jpeg"
            sx={{
              border: "4px solid",
              borderColor: "background.paper",
              boxShadow: "0 4px 14px rgba(15, 18, 40, 0.16)",
              flexShrink: 0,
              height: { xs: 104, sm: 144 },
              mt: { xs: -6.5, sm: -9 },
              width: { xs: 104, sm: 144 },
            }}
          />
          <Stack alignItems="flex-start" spacing={0.5} sx={{ mt: 1 }}>
            <Typography
              color="text.primary"
              fontWeight="bold"
              sx={{ fontSize: { xs: "1.65rem", sm: "2rem" } }}
              variant="h3"
            >
              Naufal Ardhi
            </Typography>
            <Typography color="text.primary" fontWeight="medium" variant="h6">
              Senior Software Engineer
            </Typography>
            <Stack alignItems="center" direction="row" spacing={0.75}>
              <IconMapPin color="#717385" size={17} />
              <Typography color="text.secondary" variant="body2">
                Jakarta, Indonesia
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>

      <Stack spacing={2} sx={{ p: 2 }}>
        <Typography color="text.primary" fontWeight="bold" variant="h5">
          About Me
        </Typography>
        <Typography color="text.secondary" variant="body1">
          Certified in Software and Application Development Fundamentals by
          Microsoft Technology Associate, with professional experience building
          scalable enterprise applications.
        </Typography>
        <Typography color="text.secondary" variant="body1">
          Specialized in modern web development with strong expertise in React,
          TypeScript, front-end architecture, internationalization, and
          enterprise system integration.
        </Typography>
        <Typography color="text.secondary" variant="body1">
          Passionate about building maintainable software, improving user
          experience, and adapting modern technologies to support business
          growth.
        </Typography>

        <Divider />

        <Typography color="text.primary" fontWeight="bold" variant="h5">
          Experiences
        </Typography>

        {EXPERIENCES.map((experience, experienceIndex) => {
          const companyPeriod = getCompanyPeriod(experience.roles);
          const companyDuration = companyPeriod
            ? formatPeriodDuration(companyPeriod)
            : "";
          const metaParts = [experience.employmentType, companyDuration].filter(
            (part): part is string => Boolean(part),
          );
          const isLastExperience = experienceIndex === EXPERIENCES.length - 1;

          const hasTimeline = experience.roles.length > 1;

          return (
            <Stack key={experience.company} spacing={0}>
              <Box
                sx={{
                  columnGap: 2,
                  display: "grid",
                  gridTemplateColumns: `${COMPANY_LOGO_SIZE}px 1fr`,
                }}
              >
                <Avatar
                  alt={experience.company}
                  src={experience.logoSrc}
                  sx={{
                    bgcolor: experience.logoBgColor,
                    height: COMPANY_LOGO_SIZE,
                    width: COMPANY_LOGO_SIZE,
                  }}
                  variant="rounded"
                />
                <Stack spacing={0.25} sx={{ pb: 2 }}>
                  <Typography
                    color="text.primary"
                    fontWeight="medium"
                    variant="h6"
                  >
                    {experience.company}
                  </Typography>
                  {metaParts.length > 0 ? (
                    <Typography
                      suppressHydrationWarning
                      color="text.secondary"
                      variant="body2"
                    >
                      {metaParts.join(" · ")}
                    </Typography>
                  ) : null}
                  <Typography color="text.secondary" variant="body2">
                    {experience.location}
                  </Typography>
                </Stack>

                {experience.roles.map((role, roleIndex) => {
                  const isFirstRole = roleIndex === 0;
                  const isLastRole = roleIndex === experience.roles.length - 1;

                  return (
                    <Fragment key={role.title}>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {hasTimeline ? (
                          <>
                            <Box
                              sx={{
                                bgcolor: isFirstRole
                                  ? "transparent"
                                  : "primary.main",
                                height: TIMELINE_TOP_OFFSET,
                                width: TIMELINE_LINE_WIDTH,
                              }}
                            />
                            <Box
                              sx={{
                                bgcolor: "primary.main",
                                borderRadius: "50%",
                                height: TIMELINE_DOT_SIZE,
                                width: TIMELINE_DOT_SIZE,
                              }}
                            />
                            {!isLastRole ? (
                              <Box
                                sx={{
                                  bgcolor: "primary.main",
                                  flex: 1,
                                  width: TIMELINE_LINE_WIDTH,
                                }}
                              />
                            ) : null}
                          </>
                        ) : null}
                      </Box>
                      <Box sx={{ pb: isLastRole ? 0 : 2 }}>
                        <Stack gap={0.25}>
                          <Typography
                            color="text.primary"
                            fontWeight="medium"
                            variant="body1"
                          >
                            {role.title}
                          </Typography>
                          <Typography
                            suppressHydrationWarning
                            color="text.secondary"
                            sx={{ mb: 1 }}
                            variant="subtitle1"
                          >
                            {role.period} · {formatPeriodDuration(role.period)}
                          </Typography>
                          <Stack spacing={1}>
                            {role.bullets.map((bullet) => (
                              <Typography
                                key={bullet}
                                color="text.secondary"
                                variant="body2"
                              >
                                {bullet}
                              </Typography>
                            ))}
                          </Stack>
                        </Stack>
                      </Box>
                    </Fragment>
                  );
                })}
              </Box>

              {!isLastExperience ? <Divider sx={{ mt: 2 }} /> : null}
            </Stack>
          );
        })}

        <Divider />

        <Typography color="text.primary" fontWeight="bold" variant="h5">
          Services
        </Typography>
        <Stack direction="row" flexWrap="wrap" sx={{ gap: 1 }}>
          <Chip
            color="primary"
            label="Front-end Development"
            sx={{ fontSize: 12 }}
            variant="tonal"
          />
          <Chip
            color="primary"
            label="Back-end Development"
            sx={{ fontSize: 12 }}
            variant="tonal"
          />
          <Chip
            color="primary"
            label="Application Development"
            sx={{ fontSize: 12 }}
            variant="tonal"
          />
          <Chip
            color="primary"
            label="System Architecture Design"
            sx={{ fontSize: 12 }}
            variant="tonal"
          />
          <Chip
            color="primary"
            label="AI Integration"
            sx={{ fontSize: 12 }}
            variant="tonal"
          />
          <Chip
            color="primary"
            label="System Integration"
            sx={{ fontSize: 12 }}
            variant="tonal"
          />
          <Chip
            color="primary"
            label="Design System Implementation"
            sx={{ fontSize: 12 }}
            variant="tonal"
          />
        </Stack>

        <Box
          sx={{
            backgroundColor: ({ palette }) => alpha(palette.info.main, 0.06),
            borderRadius: 2,
            mt: 1,
            p: 2,
          }}
        >
          <Stack alignItems="flex-center" direction="row" spacing={1}>
            <Box
              sx={{
                alignItems: "center",
                color: "info.main",
                display: "flex",
                flexShrink: 0,
                pt: "2px",
              }}
            >
              <IconMoodWink size={24} />
            </Box>
            <Stack>
              <Typography
                color="text.primary"
                fontWeight={"bold"}
                variant="body1"
              >
                Still here? I&apos;ll take that as hooked.
              </Typography>
              <Typography color="text.secondary" variant="body2">
                The receipts live in the{" "}
                <span style={{ fontWeight: "bold" }}>Projects</span> app - pop
                it open from the desktop and have a look at what I&apos;ve
                actually shipped.
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
}
