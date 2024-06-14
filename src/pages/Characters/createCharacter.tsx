import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Select } from "antd";
import { createCharacter } from "../categories/AxiosConfig";

export const CharacterCreate = () => {
  const { formProps, saveButtonProps } = useForm({
    resource: "character"
  });
  
  const { selectProps: sceneSelectProps } = useSelect({
    resource: "scene"
  });

  const onFinish = async (values: any) => {
    try {
      await createCharacter(values);
      console.log("Character created successfully!");
    } catch (error) {
      console.error("Error creating character:", error);
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
          label={"Cost"}
          name={"cost"}
          rules={[{ required: true, type: "number", min: 0, message: "Please enter cost" }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label={"Name of Actor"}
          name={"nameActor"}
          rules={[{ required: true, message: "Please enter name of actor" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Role"}
          name={"rol"}
          rules={[{ required: true, message: "Please enter role" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Importance"}
          name={"importance"}
          rules={[{ required: true, message: "Please enter importance" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Scene"}
          name={"scene"} 
          rules={[{ required: true, message: "Please select a scene" }]}
        >
          <Select {...sceneSelectProps} />
        </Form.Item>
      </Form>
    </Create>
  );
};
