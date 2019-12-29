export type Allocation = {
  id: string;
  user_id: string;
  profile?: {
    display_name: string;
    name?: string;
    email?: string;
    phone_number?: string;
  };
  comment?: string;
};

export type Shift = {
  id: string;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  count: number;
  allocations?: Allocation[];
};

export type Role = {
  id: string;
  name: string;
  description_md: string;
  shifts?: Shift[];
};

export type Mission = {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  description_md: string;
  roles?: Role[];
};
