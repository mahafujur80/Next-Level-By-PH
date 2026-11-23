import { pool } from "../../db/db";
import { User_Role } from "../../types";
import sentResponse from "../../utils/sendRespons";
import type { IssueType } from "./issue.interface";
const createIssueIntoDB = async (payload: IssueType, reporter_id: number) => {
  const { title, description, type } = payload;
  const result = await pool.query(
    `
    INSERT INTO issues (title,description, type, reporter_id)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `,
    [title, description, type, reporter_id],
  );
  return result;
};

const getAllIssueFromDB = async () => {
  const result = await pool.query(`
    SELECT * FROM issues
    `);

  return result;
};

const updateUserIssueIntoDB = async (payload: Partial<IssueType>, id:number, role:string) => {
  const issue = await pool.query(`
    SELECT * FROM issues WHERE id=$1
    `,[id]);
  if (issue.rowCount === 0) {
    throw new Error("issue not found");
  }

  const { title, description, type, status} = payload;

  if(status !== undefined &&  role !== User_Role.maintainer){
    throw new Error("Forbidden: Only maintainers can update status.")
  }

  const result = await pool.query(
    `
        UPDATE issues SET
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        type = COALESCE($3, type),
        status = COALESCE($4, status),
        updated_at = NOW()
        WHERE id =$5
        RETURNING *
        `,
    [title ?? null, description ?? null, type ?? null, status ?? null, id]
  );

  return result
};

export const issueService = {
  createIssueIntoDB,
  getAllIssueFromDB,
  updateUserIssueIntoDB,
};
