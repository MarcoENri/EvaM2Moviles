import { DeleteButton, EditButton, List, ShowButton, useTable } from "@refinedev/antd";
import { BaseRecord } from "@refinedev/core";
import { Space, Table } from "antd";
import { useEffect, useState } from "react";
import { deleteScene, getScenes } from "../categories/AxiosConfig";

export const SceneList = () => {
  const { tableProps } = useTable({
    resource: "scene",
    syncWithLocation: true,
  });

  const [scenes, setScenes] = useState<BaseRecord[]>([]);

  useEffect(() => {
    const fetchScenes = async () => {
      try {
        const response = await getScenes();
        setScenes(response.data); 
      } catch (error) {
        console.error("Error fetching scenes:", error);
      }
    };
    fetchScenes();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteScene(id); 
      console.log("Scene deleted successfully!");
      setScenes(scenes.filter(scene => scene.id !== id));
    } catch (error) {
      console.error("Error deleting scene:", error);
    }
  };

  return (
    <List>
      <Table {...tableProps} dataSource={scenes} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="description" title="Description" />
        <Table.Column dataIndex="minutes" title="Minutes" />
        <Table.Column dataIndex="location" title="Location" />
        <Table.Column dataIndex="setting" title="Setting" />
        <Table.Column
          dataIndex="filmId"
          title="Film ID"
          render={(filmId: number) => (
            <span>{`Film ID: ${filmId}`}</span>
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
