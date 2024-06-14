import { Create, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker, InputNumber } from "antd";
import { createFilm } from "../categories/AxiosConfig"; 

export const FilmCreate = () => {
  const { formProps, saveButtonProps } = useForm({
    resource: "film"
  });

  const onFinish = async (values: any) => {
    try {
      await createFilm(values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
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
        <Form.Item label="Release Date" name="releaseDate" rules={[{ required: true }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item label="Genre" name="genre">
          <Input />
        </Form.Item>
        <Form.Item label="Box Office" name="boxOffice" rules={[{ required: true }]}>
          <InputNumber min={0} />
        </Form.Item>
      </Form>
    </Create>
  );
};
