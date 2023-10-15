import http from "../lib/http";

const getOne = async (id: String) => {
  return await http.get(`/plans/${id}`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW5pdHkiLCJleHAiOjE2OTk5MzMyNDIsImlhdCI6MTY5NzM0MTI0MiwidXNlcklkIjoiOWQxNjY3YjQtMWEyMS00MzJlLTk5YTgtZTkyZjY1NDRiZWNjIn0.5Yj0KdCd6ivbyTuMUlGKT1lzNYqfw2_ztYihiY9FVtk`,
    },
  });
};

export { getOne };
