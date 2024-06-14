import { NumberField, Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography } from "antd";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getSceneById } from "../categories/AxiosConfig"; 

const { Title } = Typography;

export const SceneShow = () => {
  const { id } = useParams<{ id: string }>();
  const { queryResult } = useShow({
    resource: "scene", 
    id: id,
  });

  const { data, isLoading } = queryResult;

  useEffect(() => {
    const fetchData = async () => {
      await getSceneById(Number(id)); 
    };
    fetchData();
  }, [id]);

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>ID</Title>
      <NumberField value={record?.id ?? ""} />
      <Title level={5}>Description</Title>
      <TextField value={record?.description} />
      <Title level={5}>Minutes</Title>
      <NumberField value={record?.minutes} />
      <Title level={5}>Location</Title>
      <TextField value={record?.location} />
      <Title level={5}>Setting</Title>
      <TextField value={record?.setting} />
      <Title level={5}>Film ID</Title>
      <NumberField value={record?.filmId} />
    </Show>
  );
};
