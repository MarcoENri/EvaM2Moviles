import React, { useEffect, useState } from "react";
import { DeleteButton, EditButton, List, ShowButton, useTable } from "@refinedev/antd";
import { BaseRecord } from "@refinedev/core";
import { Space, Table } from "antd";
import { deleteFilm, getFilms } from "../categories/AxiosConfig";

export const FilmList = () => {
  const { tableProps } = useTable({
    resource: "film",
    syncWithLocation: true,
  });

  const [films, setFilms] = useState<BaseRecord[]>([]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await getFilms();
        setFilms(response.data); 
      } catch (error) {
        console.error("Error fetching films:", error);
        
      }
    };
    fetchFilms();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteFilm(id); 
      console.log("Film deleted successfully!");
      
      setFilms(films.filter(film => film.id !== id));
    } catch (error) {
      console.error("Error deleting film:", error);
      
    }
  };

  return (
    <List>
      <Table {...tableProps} dataSource={films} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="director" title="Director" />
        <Table.Column dataIndex="budget" title="Budget" />
        <Table.Column dataIndex="duration" title="Duration" />
        <Table.Column dataIndex="releaseDate" title="Release Date" />
        <Table.Column dataIndex="genre" title="Genre" />
        <Table.Column dataIndex="boxOffice" title="Box Office" />
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
