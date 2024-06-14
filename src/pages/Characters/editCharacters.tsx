import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Select } from "antd";

export const CharacterEdit = () => {
  const { formProps, saveButtonProps, queryResult } = useForm({
    resource: "characters",
    action: "edit",
  });

  const { selectProps: sceneSelectProps } = useSelect({
    resource: "scene",
    defaultValue: queryResult?.data?.data?.scene_id,
  });

  const characterData = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" initialValues={characterData}>
        <Form.Item
          label={"Description"}
          name={["description"]}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Cost"}
          name={["cost"]}
          rules={[{ required: true }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label={"Name of Actor"}
          name={["name_actor"]}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Role"}
          name={["rol"]}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Importance"}
          name={["importance"]}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Scene Description"}
          name={["scene"]}
        >
          <Select {...sceneSelectProps} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
