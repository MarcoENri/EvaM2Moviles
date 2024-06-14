import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Select } from "antd";
import { createScene } from "../categories/AxiosConfig"; 

export const SceneCreate = () => {
  const { formProps, saveButtonProps } = useForm({
    resource: "scene", 
  });

  const { selectProps: filmSelectProps } = useSelect({
    resource: "film", 
  });

  const onFinish = async (values: any) => {
    try {
      await createScene(values);
      console.log("Scene created successfully!");
    } catch (error) {
      console.error("Error creating scene:", error);
    }
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label={"Description"}
          name={"description"}
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Minutes"}
          name={"minutes"}
          rules={[{ required: true, message: "Please enter duration in minutes" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label={"Location"}
          name={"location"}
          rules={[{ required: true, message: "Please enter location" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Setting"}
          name={"setting"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Film"}
          name={"filmId"}
          rules={[{ required: true, message: "Please select a film" }]}
        >
          <Select {...filmSelectProps} />
        </Form.Item>
        <Form.Item>
        </Form.Item>
      </Form>
    </Create>
  );
};
