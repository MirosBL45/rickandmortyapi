import { Modal, Form, Input, Select, Button } from "antd";
import { observer } from "mobx-react-lite";
import { useCharacterStore } from "../../context/CharacterContext";
import { useEffect } from "react";

import './EditCharacterModal.module.scss';

const EditCharacterModal = observer(() => {
  const store = useCharacterStore();

  const editingId = store.editCharacterId;
  const character = store.favorites.find((c) => c.id === editingId);

  const [form] = Form.useForm();

  // kada se pojavi character → popuni formu
  useEffect(() => {
    if (character) {
      form.setFieldsValue({
        name: character.name,
        species: character.species,
        status: character.status,
        gender: character.gender,
      });
    }
  }, [character]);

  const handleSubmit = (values: any) => {
    if (!character) return;

    store.updateFavorite({
      id: character.id,
      ...values,
    });
  };

  return (
    // <div className={styles.wrapper}>
      <Modal
        open={!!character}
        title={character ? `Edit: ${character.name}` : ""}
        onCancel={() => store.closeEditModal()}
        footer={null}
        destroyOnHidden
      >
        {character && (
          <Form layout="vertical" form={form} onFinish={handleSubmit}>
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Species"
              name="species"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true }]}
            >
              <Select
                options={[
                  { value: "Alive", label: "Alive" },
                  { value: "Dead", label: "Dead" },
                  { value: "unknown", label: "Unknown" },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true }]}
            >
              <Select
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                  { value: "Genderless", label: "Genderless" },
                  { value: "unknown", label: "Unknown" },
                ]}
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" block>
              Save Changes
            </Button>
          </Form>
        )}
      </Modal>
    // </div>
  );
});

export default EditCharacterModal;
