import React, { useState } from "react";
import { createPoll, createOption } from "../services/api";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  IconButton,
} from "@mui/material";
import AddCircle from "@mui/icons-material/AddCircle";
import RemoveCircle from "@mui/icons-material/RemoveCircle";

export default function PollCreate() {
  const [question, setQuestion] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleOptionChange = (idx, value) => {
    const newOptions = [...options];
    newOptions[idx] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, ""]);
  const removeOption = (idx) =>
    setOptions(options.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Backend sets created_by automatically
      const pollRes = await createPoll({
        question,
        expires_at: expiresAt,
      });
      const pollId = pollRes.data.id;

      // Create poll options
      await Promise.all(
        options
          .filter((opt) => opt.trim())
          .map((opt) => createOption({ poll: pollId, text: opt }))
      );

      setSuccess("Poll created successfully!");
      setQuestion("");
      setExpiresAt("");
      setOptions(["", ""]);
    } catch (err) {
      console.error("Poll creation error:", err.response?.data);
      const data = err.response?.data;
      let msg =
        data?.detail ||
        Object.values(data || {}).flat().join(" ") ||
        "Poll creation failed. Please check your inputs.";
      setError(msg);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" mb={2}>
        Create a New Poll
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Question"
          fullWidth
          margin="normal"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />

        <TextField
          label="Expiry Date & Time"
          type="datetime-local"
          fullWidth
          margin="normal"
          value={expiresAt}
          onChange={(e) => setExpiresAt(e.target.value)}
          required
          InputLabelProps={{ shrink: true }}
        />

        <Typography variant="subtitle1" mt={2}>
          Options
        </Typography>
        {options.map((opt, idx) => (
          <Box
            key={idx}
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <TextField
              label={`Option ${idx + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
              required
              sx={{ flex: 1 }}
            />
            {options.length > 2 && (
              <IconButton
                onClick={() => removeOption(idx)}
                color="error"
              >
                <RemoveCircle />
              </IconButton>
            )}
          </Box>
        ))}

        <Button
          startIcon={<AddCircle />}
          onClick={addOption}
          sx={{ mb: 2 }}
        >
          Add Option
        </Button>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={
            !question.trim() ||
            !expiresAt.trim() ||
            options.filter((o) => o.trim()).length < 2
          }
        >
          Create Poll
        </Button>
      </form>
    </Box>
  );
}
