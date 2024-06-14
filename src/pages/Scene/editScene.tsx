import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Select } from "antd";

export const SceneEdit = () => {
  const { formProps, saveButtonProps, queryResult } = useForm({
    resource: "scene",
    action: "edit",
  });

  const { selectProps: filmSelectProps } = useSelect({
    resource: "film",
    defaultValue: queryResult?.data?.data?.film_id,
  });

  const sceneData = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" initialValues={sceneData}>
        <Form.Item
          label={"Description"}
          name={["description"]}
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Minutes"}
          name={["minutes"]}
          rules={[{ required: true, message: "Please enter minutes" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label={"Location"}
          name={["location"]}
          rules={[{ required: true, message: "Please enter location" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Setting"}
          name={["setting"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Film"}
          name={["filmId"]}
        >
          <Select {...filmSelectProps} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
