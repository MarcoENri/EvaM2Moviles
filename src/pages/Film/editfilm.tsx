import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker, InputNumber } from "antd";
import moment from "moment"; // Importar moment
import { getFilmById, updateFilm } from "../categories/AxiosConfig";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const FilmEdit = () => {
  const { id } = useParams<{ id: string }>();
  const { formProps, saveButtonProps } = useForm({
    resource: "film",
    action: "edit",
    id: id,
  });

  const [initialValuesSet, setInitialValuesSet] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFilmById(Number(id));
        if (formProps.form) {
          const dataWithMomentDate = {
            ...response.data,
            releaseDate: moment(response.data.releaseDate),
          };
          formProps.form.setFieldsValue(dataWithMomentDate);
          setInitialValuesSet(true);
        }
      } catch (error) {
        console.error("Error fetching film:", error);
      }
    };
    fetchData();
  }, [id, formProps.form]);

  const onFinish = async (values: any) => {
  try {
    values.releaseDate = values.releaseDate.format("YYYY-MM-DD");

    await updateFilm(Number(id), values);
    console.log("Film updated successfully!");
  } catch (error) {
    console.error("Error updating film:", error);
  }
};

  if (!initialValuesSet) {
    return null; 
  }

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Director" name="director" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Budget" name="budget" rules={[{ required: true }]}>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="Duration" name="duration" rules={[{ required: true }]}>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label="Release Date"
          name="releaseDate"
          rules={[{ required: true }]}
        >
          <DatePicker format="YYYY-MM-DD" /> {}
        </Form.Item>
        <Form.Item label="Genre" name="genre">
          <Input />
        </Form.Item>
        <Form.Item
          label="Box Office"
          name="boxOffice"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
