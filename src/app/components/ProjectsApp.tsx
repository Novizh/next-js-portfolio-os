import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { IconExternalLink, IconMoodHeart } from "@tabler/icons-react";

import {
  PROJECT_ASSOCIATION_LOGO_SIZE,
  PROJECTS,
} from "libs/constants/user";

export default function ProjectsApp() {
  return (
    <Stack spacing={2}>
      <Typography color="text.primary" fontWeight="bold" variant="h5">
        Projects
      </Typography>

      {PROJECTS.map((project, projectIndex) => {
        const isLastProject = projectIndex === PROJECTS.length - 1;

        return (
          <Stack key={project.id} spacing={1.25}>
            <Stack spacing={0.25}>
              <Typography
                color="text.primary"
                fontWeight={600}
                variant="subtitle1"
              >
                {project.name}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {project.period}
              </Typography>
            </Stack>

            <Stack alignItems="center" direction="row" spacing={1}>
              <Avatar
                alt={project.company}
                src={project.logo}
                sx={{
                  fontSize: 12,
                  height: PROJECT_ASSOCIATION_LOGO_SIZE,
                  width: PROJECT_ASSOCIATION_LOGO_SIZE,
                }}
                variant="rounded"
              />
              <Typography color="text.secondary" variant="body2">
                Associated with {project.company}
              </Typography>
            </Stack>

            {project.projectUrl ? (
              <Box>
                <Button
                  color="secondary"
                  component="a"
                  endIcon={<IconExternalLink size={14} />}
                  href={project.projectUrl}
                  rel="noopener noreferrer"
                  size="small"
                  target="_blank"
                  variant="outlined"
                >
                  Show project
                </Button>
              </Box>
            ) : null}

            <Stack spacing={1}>
              {project.description.map((paragraph) => (
                <Typography
                  key={paragraph}
                  color="text.secondary"
                  variant="body2"
                >
                  {paragraph}
                </Typography>
              ))}
            </Stack>

            <Stack spacing={0.75}>
              <Typography
                color="text.primary"
                fontWeight={600}
                variant="body2"
              >
                Skills
              </Typography>
              <Stack direction="row" flexWrap="wrap" sx={{ gap: 0.75 }}>
                {project.stacks.map((stack) => (
                  <Chip
                    key={stack}
                    color="primary"
                    label={stack}
                    size="small"
                    sx={{ fontSize: 12 }}
                    variant="tonal"
                  />
                ))}
              </Stack>
            </Stack>

            {!isLastProject ? <Divider sx={{ pt: 1 }} /> : null}
          </Stack>
        );
      })}

      <Box
        sx={{
          backgroundColor: "rgba(0, 122, 51, 0.06)",
          borderRadius: 2,
          mt: 1,
          p: 2,
        }}
      >
        <Stack alignItems="flex-center" direction="row" spacing={1}>
          <Box
            sx={{
              alignItems: "center",
              color: "success.main",
              display: "flex",
              flexShrink: 0,
              pt: "2px",
            }}
          >
            <IconMoodHeart size={24} />
          </Box>
          <Stack spacing={0.25}>
            <Typography
              color="text.primary"
              fontWeight={"bold"}
              variant="body1"
            >
              Can you guess which one of these is a Pokémon?
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Trick question - they&apos;re all very real. Now that you&apos;ve
              seen what I&apos;ve built, fire up the <span style={{ fontWeight: "bold" }}>Talk to Me</span> app from the
              desktop and let&apos;s get in touch.
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
