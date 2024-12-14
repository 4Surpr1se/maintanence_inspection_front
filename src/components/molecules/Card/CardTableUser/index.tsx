import { Avatar, Flex } from "antd";

interface CardTableProps {
  iconUrl: string;
  userName: string;
}

export default function CardTableUser(props: CardTableProps) {
  const { userName, iconUrl } = props;

  return (
    <Flex align="center" gap={8}>
      <Avatar shape="square" src={iconUrl} />
      <p style={{ maxWidth: 118 }}>{userName}</p>
    </Flex>
  );
}
