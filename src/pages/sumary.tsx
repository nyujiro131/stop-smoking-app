import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardProps,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import annotationPlugin from "chartjs-plugin-annotation";
import CachedIcon from "@mui/icons-material/Cached";
import { Tooltip as MuiTooltip } from "@mui/material";

import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { format } from "date-fns";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

type dataType = {
  measuredAt: string;
  value: number;
};

export const Sumary = (props: { count: number }) => {
  const [duration, setDuration] = useState({
    key: "3ヶ月",
    value: 90,
  });

  const { count } = props;
  const dt = new Date();
  const tempArray: dataType[] = [];
  for (let i = 0; i < 3650; i++) {
    dt.setDate(dt.getDate() + 1);

    const smokingCount = {
      measuredAt: dt.toISOString(),
      value: (count + count * i) * 29,
    };
    tempArray.push(smokingCount);
  }
  const [filterdData, setFilterdData] = useState(
    tempArray.slice(0, duration.value)
  );
  // グラフデータ
  const data = {
    datasets: [
      {
        backgroundColor: "#3F51B5",
        borderColor: "#3F51B5",
        data: filterdData,
        // label: t.THIS_YEAR,
        label: `得する金額`,
        pointRadius: 0,
        borderWidth: 3,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    parsing: {
      xAxisKey: "measuredAt",
      yAxisKey: "value",
    },
    scales: {
      x: {
        distribution: "liner",
        type: "time" as const,
        time: {
          unit: "day" as const,
          displayFormats: {
            day: "yyyy/MM/dd",
          } as const,
        } as const,
      },
    },
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    setDuration({
      key: event.target.name,
      value: Number(event.target.value),
    });
    setFilterdData(tempArray.slice(0, Number(event.target.value)));
  };

  return (
    <>
      <Box sx={{ m: 1, minWidth: 120 }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>期間</InputLabel>
          <Select
            name="duration"
            value={String(duration.value)}
            label="customerName"
            onChange={handleChange}
            defaultValue={"all"}
          >
            <MenuItem value={30} key="1ヶ月">
              1ヶ月
            </MenuItem>
            <MenuItem value={90} key="3ヶ月">
              3ヶ月
            </MenuItem>
            <MenuItem value={180} key="6ヶ月">
              6ヶ月
            </MenuItem>
            <MenuItem value={365} key="1年">
              1年
            </MenuItem>
            <MenuItem value={1095} key="3年">
              3年
            </MenuItem>
            <MenuItem value={1820} key="5年">
              5年
            </MenuItem>
            <MenuItem value={3650} key="10年">
              10年
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Card>
        <CardContent>
          <Box sx={{ height: 400, width: "170vh" }}>
            <Line data={data} options={options} />
          </Box>
        </CardContent>
      </Card>

      <Grid container direction="row" sx={{ m: 1 }} spacing={2}>
        <Grid item>
          <Card>
            <CardHeader title="3ヶ月で" />
            <CardContent>
              <Stack direction="row" alignItems={"baseline"}>
                <Typography variant="h3">{tempArray[89].value}円</Typography>
                <Typography variant="h6">お得</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card>
            <CardHeader title="1年で" />
            <CardContent>
              <Stack direction="row" alignItems={"baseline"}>
                <Typography variant="h3">{tempArray[363].value}円</Typography>
                <Typography variant="h6">お得</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card>
            <CardHeader title="5年で" />
            <CardContent>
              <Stack direction="row" alignItems={"baseline"}>
                <Typography variant="h3">{tempArray[1819].value}円</Typography>
                <Typography variant="h6">お得</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card>
            <CardHeader title="10年で" />
            <CardContent>
              <Stack direction="row" alignItems={"baseline"}>
                <Typography variant="h3">{tempArray[3639].value}円</Typography>
                <Typography variant="h6">お得</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
