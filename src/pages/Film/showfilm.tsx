import { NumberField, Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography } from "antd";
import { getFilmById } from "../categories/AxiosConfig"; 
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const { Title } = Typography;

export const FilmShow = () => {
  const { id } = useParams<{ id: string }>();
  const { queryResult } = useShow({
    resource: "film",
    id: id,
  });

  const { data, isLoading } = queryResult;

  useEffect(() => {
    const fetchData = async () => {
      await getFilmById(Number(id));
    };
    fetchData();
  }, [id]);

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>ID</Title>
      <NumberField value={record?.id ?? ""} />
      <Title level={5}>Title</Title>
      <TextField value={record?.title} />
      <Title level={5}>Director</Title>
      <TextField value={record?.director} />
      <Title level={5}>Budget</Title>
      <NumberField value={record?.budget} />
      <Title level={5}>Duration</Title>
      <NumberField value={record?.duration} />
      <Title level={5}>Release Date</Title>
      <TextField value={record?.releaseDate} />
      <Title level={5}>Genre</Title>
      <TextField value={record?.genre} />
      <Title level={5}>Box Office</Title>
      <NumberField value={record?.boxOffice} />
    </Show>
  );
};
