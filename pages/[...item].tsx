import React, { useEffect } from "react";
import type { NextPage } from "next";
import Seo from "../components/Seo";
import { useGlobalState } from "../hooks/useGlobalState";
import Head from "next/head";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { MongooseItemInterface } from "../interfaces/item";
import handleAxiosError from "../hooks/handleAxiosError";

const Item: NextPage = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const { state, setState } = useGlobalState();
  const router = useRouter()
  const [item, setItem] = React.useState<MongooseItemInterface | null>(null)
  const { id } = router.query

  useEffect(() => {
    if (typeof id == "string") {
      axios.get("/api/itemHandler", {
        headers: {
          method: "get",
          _id: id
        }
      }).then((response: AxiosResponse<MongooseItemInterface>) => {
        setItem(response.data);
        setLoading(false)
      }).catch((error: AxiosError<Error>) => handleAxiosError(error));
    } else {
      alert("Invalid ID provided")
      router.push("/")
      return;
    }
  }, []);

  if (loading) {
    return (
      <>
        <Seo type="item" name="Loading..." />
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Loading...</title>
      </Head>
    </>
  );
};

export default Item;
