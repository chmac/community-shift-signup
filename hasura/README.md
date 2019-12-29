# Hasura

Schema

* Profile
  - id
  - user_id
  - profile_md
* Mission
  - id
  - user_id
  - name
  - slug
  - description_md
  - created_at
  - updated_at
* Role
  - id
  - mission_id
  - name
  - description_md
  - created_at
  - updated_at
* Shift
  - id
  - role_id
  - count
  - start_date
  - start_time
  - end_date
  - end_time
  - created_at
  - updated_at
* Allocation (Assignment OR Allocation OR Allotment)
  - id
  - shift_id
  - user_id OR name / email / phone
  - created_at
  - updated_at
