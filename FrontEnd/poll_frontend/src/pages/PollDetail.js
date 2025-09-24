import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPoll, fetchPollResults, castVote } from "../services/api";
import {
  Box,
  Typography,
  Card,
  CardContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Alert,
} from "@mui/material";

export default function PollDetail() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchPoll(id).then((res) => setPoll(res.data));
    fetchPollResults(id).then((res) => setResults(res.data));
  }, [id]);

  const handleVote = async () => {
    setError("");
    setSuccess("");
    try {
      // send only poll + option, not user
      await castVote({
        poll: poll.id,
        option: parseInt(selectedOption, 10),
      });

      setSuccess("Vote cast successfully!");
      fetchPollResults(id).then((res) => setResults(res.data));
   } catch (err) {
      console.error("Vote error:", err.response?.data);
      const msg =
        err.response?.data?.poll ||
        err.response?.data?.option ||
        err.response?.data?.non_field_errors?.[0] ||
        err.response?.data?.detail ||
        (typeof err.response?.data === "string" ? err.response.data : null) ||
        "Voting failed.";
      setError(msg);
    }

  };

  if (!poll) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5">{poll.question}</Typography>
          <Typography variant="body2" mb={2}>
            Expires: {new Date(poll.expires_at).toLocaleString()}
          </Typography>
          <RadioGroup
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {poll.options.map((option) => (
              <FormControlLabel
                key={option.id}
                value={option.id.toString()}
                control={<Radio />}
                label={option.text}
              />
            ))}
          </RadioGroup>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            disabled={!selectedOption}
            onClick={handleVote}
          >
            Vote
          </Button>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {success}
            </Alert>
          )}
        </CardContent>
      </Card>
      {results && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Results</Typography>
          {results.results.map((r) => (
            <Typography key={r.option}>
              {r.option}: {r.votes} votes
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
}
