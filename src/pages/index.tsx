import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import router from "next/router";
import { useState } from "react";
import { Sumary } from "./sumary";

export default function Home() {
  const [count, setCount] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);

  const handleInputCount = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    const keyword = event.target.value;
    setCount(Number(keyword));
  };
  return (
    <>
      <Head>
        <title>Top</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          flexGrow: 1,
          py: 5,
        }}
      >
        <Container maxWidth={false}>
          <Stack direction={{ xs: "column", sm: "row" }} alignItems="center">
            <Typography sx={{ m: 1 }} variant="h4">
              普段の喫煙ペース
            </Typography>
            <Paper sx={{ m: 1 }}>
              <Box sx={{ m: 1, minWidth: 200 }}>
                <FormControl sx={{ minWidth: 120 }}>
                  <Stack direction="row" alignItems="center">
                    <Typography>1日あたり</Typography>
                    <TextField
                      label=""
                      name="keyword"
                      onChange={handleInputCount}
                      required
                      value={count}
                      variant="outlined"
                      sx={{ width: 70, mx: 1 }}
                      type="number"
                    />
                    <Typography>本</Typography>
                  </Stack>
                </FormControl>
              </Box>
            </Paper>
          </Stack>
          <Grid
            container
            alignItems="center"
            justifyContent={"center"}
            component={"main"}
            direction="column"
            sx={{ height: "70vh", mt:7 }}
          >
            {start ? (
              <Grid item>
                <Sumary count={count} />
              </Grid>
            ) : (
              <Grid item>
                <Button
                  sx={{ fontSize: "50px" }}
                  type="submit"
                  size="large"
                  variant="outlined"
                  onClick={() => setStart(true)}
                  disabled={count == 0}
                >
                  禁煙を始める
                </Button>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
