import { SearchOutlined } from "@ant-design/icons";
import { Col, Input, InputNumber, Row, Select, Space } from "antd";
import { FC } from "react";
import styles from "./index.module.scss";
import { SearchAndFilterProps } from "./types";
// For search filter and paginate
const SearchAndFilter: FC<SearchAndFilterProps> = (props) => {
  // Init
  const {
    performSearchHandler,
    searchValue,
    performFilterHandler,
    modifyPageSize,
    PageSize,
  } = props;
  // JSX
  return (
    <div className={styles["search-filter"]}>
      <div className={styles["search-filter__wrapper"]}>
        <Row justify={"space-between"}>
          <Col>
            <InputNumber
              min={10}
              max={15}
              defaultValue={10}
              value={PageSize}
              onChange={modifyPageSize}
              size="large"
              type="number"
            />
          </Col>
          <Col>
            <Space>
              <Input
                className={styles["search-filter__search"]}
                placeholder="Search here..."
                suffix={<SearchOutlined />}
                onChange={performSearchHandler}
                value={searchValue}
                size="large"
              />
              <Select
                defaultValue="All"
                style={{ width: 200 }}
                onChange={performFilterHandler}
                options={[
                  { label: "All", value: "all" },
                  { label: "Active", value: "active" },
                  { label: "Inactive", value: "inactive" },
                ]}
                size="large"
              />
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SearchAndFilter;
