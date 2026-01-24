import { useState } from "react";
import { LuTrash2, LuLink, LuPlus } from "react-icons/lu";

const AddAttachmentsInput = ({ attachments = [], setAttachments }) => {
  const [link, setLink] = useState("");

  const handleAdd = () => {
    if (!link.trim()) return;

    setAttachments([...attachments, link.trim()]);
    setLink("");
  };

  const handleDelete = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-2 space-y-2">
      {/* Existing attachments */}
      {attachments.map((url, index) => (
        <div
          key={index}
          className="flex items-center justify-between px-3 py-2 hover:bg-slate-50 rounded"
        >
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <LuLink />
            <span className="truncate">{url}</span>
          </div>

          <LuTrash2
            className="text-rose-500 cursor-pointer"
            onClick={() => handleDelete(index)}
          />
        </div>
      ))}

      {/* Add new attachment */}
      <div className="flex gap-2 mt-2">
        <input
          className="form-input flex-1"
          placeholder="Add File Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <button
  type="button"
  onClick={handleAdd}
  className="
    flex items-center gap-2
    px-3 py-2
    text-sm font-medium
    rounded-lg
    bg-slate-100 text-slate-700
    hover:bg-slate-200
    transition
  "
>
  <span className="text-lg leading-none">+</span>
  Add
</button>
      </div>
    </div>
  );
};

export default AddAttachmentsInput;
