import { SimpleForm, TextInput, required, Edit } from "react-admin";

export const CourseEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" validate={[required()]} label={"Id"} />
      <TextInput source="title" validate={[required()]} label={"Title"} />
      <TextInput source="imageSrc" validate={[required()]} label={"Image"} />
    </SimpleForm>
  </Edit>
);