import { NumberField, Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography } from "antd";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getCharacterById } from "../categories/AxiosConfig"; 

const { Title } = Typography;

export const CharacterShow = () => {
  const { id } = useParams<{ id: string }>();
  const { queryResult } = useShow({
    resource: "characters", 
    id: id,
  });

  const { data, isLoading } = queryResult;

  useEffect(() => {
    const fetchData = async () => {
      await getCharacterById(Number(id)); 
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
      <Title level={5}>Cost</Title>
      <NumberField value={record?.cost} />
      <Title level={5}>Name of Actor</Title>
      <TextField value={record?.nameActor} />
      <Title level={5}>Role</Title>
      <TextField value={record?.rol} />
      <Title level={5}>Importance</Title>
      <TextField value={record?.importance} />
      <Title level={5}>Scene Description</Title>
      <TextField value={record?.scene} />
    </Show>
  );
};
