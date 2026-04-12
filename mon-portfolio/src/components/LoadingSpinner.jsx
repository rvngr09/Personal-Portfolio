import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

export function FacebookCircularProgress(props) {
  return (
    <CircularProgress
      variant="indeterminate"
      disableShrink
      enableTrackSlot
      sx={(theme) => ({
        color: "#0b7a4f",
        animationDuration: "550ms",
        [`& .${circularProgressClasses.circle}`]: {
          strokeLinecap: "round",
        },
        [`& .${circularProgressClasses.track}`]: {
          opacity: 1,
          stroke: (theme.vars || theme).palette.grey[200],
          ...theme.applyStyles("dark", {
            stroke: (theme.vars || theme).palette.grey[800],
          }),
        },
        ...theme.applyStyles("dark", {
          color: "#308fe8",
        }),
      })}
      size={40}
      thickness={4}
      {...props}
    />
  );
}

export function GradientCircularProgress() {
  return (
    <>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress sx={{ "svg circle": { stroke: "url(#my_gradient)" } }} />
    </>
  );
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
    ...theme.applyStyles("dark", {
      backgroundColor: "#308fe8",
    }),
  },
}));

export function CustomLinearProgress({ value = 50 }) {
  return <BorderLinearProgress variant="determinate" value={value} />;
}
export default FacebookCircularProgress;
