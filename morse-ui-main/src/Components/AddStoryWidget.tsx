import { Input, Modal, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { UploadChangeParam, UploadFile } from "antd/lib/upload";
import { useState } from "react";
import { addStory } from "../lib/story";
import toast from "react-hot-toast";

const AddStoryWidget = ({ modalOpen, closeModal }: any) => {
  const [selectedFiletype, setSelectedFiletype] = useState<string | null>(null);
  const [selectedFileSrc, setSelectedFileSrc] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [caption, setCaption] = useState<string | null>(null);
  const onFileSelect = (info: UploadChangeParam<UploadFile<any>>) => {
    const selectedFiledtype = info.file.type!.split("/")[0];
    setSelectedFiletype(selectedFiledtype);
    setSelectedFile(info.file.originFileObj!);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(info.file.originFileObj!);
    fileReader.onload = () => {
      setSelectedFileSrc(fileReader.result as string);
    };
  };

  const postStory = async () => {
    try {
      await addStory({
        media: selectedFile,
        caption,
      });
      closeModal();
      toast.success("Story added successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setSelectedFiletype(null);
      setSelectedFileSrc(null);
      setSelectedFile(null);
      setCaption(null);
    }
  };

  return (
    <Modal
      title={<div style={{ textAlign: "center" }}>Add story</div>}
      centered
      width={700}
      closable={false}
      open={modalOpen}
      okText="Confirm"
      cancelText="Cancel"
      onOk={postStory}
      onCancel={closeModal}
    >
      {!selectedFiletype && (
        <Upload className="upload" onChange={onFileSelect}>
          <div
            style={{
              width: "100%",
              height: "350px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px dashed #d9d9d9",
              borderRadius: "2px",
              flexDirection: "column",
              background: "#F5F5F5",
              cursor: "pointer",
            }}
          >
            <PlusOutlined
              style={{
                fontSize: "40px",
              }}
            />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      )}
      {selectedFiletype && (
        <>
          {selectedFiletype === "image" && (
            <img
              src={selectedFileSrc!}
              style={{
                width: "100%",
                height: "350px",
              }}
            />
          )}
          {selectedFiletype === "video" && (
            <video
              src={selectedFileSrc!}
              style={{
                width: "100%",
                height: "350px",
              }}
              controls={false}
              autoPlay
              muted
              loop
            />
          )}
          <Input
            style={{
              marginTop: 16,
            }}
            size="large"
            placeholder="Write a caption..."
            onChange={(e) => setCaption(e.target.value)}
          />
        </>
      )}
    </Modal>
  );
};

export default AddStoryWidget;
