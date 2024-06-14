import { DeleteButton, EditButton, List, ShowButton, useTable } from "@refinedev/antd";
import { BaseRecord } from "@refinedev/core";
import { Space, Table } from "antd";
import { useEffect, useState } from "react";
import { deleteCharacter, getCharacters } from "../categories/AxiosConfig";

export const CharacterList = () => {
  const { tableProps } = useTable({
    resource: "characters",
    syncWithLocation: true,
  });

  const [characters, setCharacters] = useState<BaseRecord[]>([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await getCharacters();
        setCharacters(response.data); 
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };
    fetchCharacters();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteCharacter(id); 
      console.log("Character deleted successfully!");
      setCharacters(characters.filter(character => character.id !== id));
    } catch (error) {
      console.error("Error deleting character:", error);
    }
  };

  return (
    <List>
      <Table {...tableProps} dataSource={characters} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="description" title="Description" />
        <Table.Column dataIndex="cost" title="Cost" />
        <Table.Column dataIndex="nameActor" title="Name of Actor" />
        <Table.Column dataIndex="rol" title="Role" />
        <Table.Column dataIndex="importance" title="Importance" />
        <Table.Column
          dataIndex="scene"
          title="Scene Description"
          render={(sceneId: number) => (
            <span>{`Scene ID: ${sceneId}`}</span>
          )}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton
                hideText
                size="small"
                recordItemId={record.id}
                onClick={() => handleDelete(Number(record.id))}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
