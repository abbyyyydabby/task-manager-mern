import React from "react";

const DeleteAlert = ({ content, onDelete, onCancel }) => {
  return (
    <div className="space-y-4">
      {/* Message */}
      <p className="text-sm text-slate-600">
        {content}
      </p>

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-6">
        {/* Cancel */}
        <button
          type="button"
          className="px-4 py-2 text-sm rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
          onClick={onCancel}
        >
          Cancel
        </button>

        {/* Delete */}
        <button
          type="button"
          className="flex items-center justify-center gap-1 px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
