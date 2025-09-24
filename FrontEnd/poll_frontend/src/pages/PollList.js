import React, { useEffect, useState } from "react";
import { fetchPolls } from "../services/api";
import { Link } from "react-router-dom";
import { Box, Typography, Card, CardContent, CircularProgress } from "@mui/material";

export default function PollList() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPolls()
      .then(res => setPolls(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h4" mb={2}>Polls</Typography>
      {polls.map(poll => (
        <Card key={poll.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{poll.question}</Typography>
            <Typography variant="body2">
              Expires: {new Date(poll.expires_at).toLocaleString()}
            </Typography>
            <Link to={`/polls/${poll.id}`}>View Details</Link>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}