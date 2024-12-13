import { colors } from "@/theming/colors";
import { profileImg } from "@/utils/helpers";
import { Avatar, Space } from "antd";
import { CSSProperties } from "react";

interface AccountListProps {
  handleSelectAccount: (account: any) => void;
  accounts: any[];
}

const AccountList = ({ handleSelectAccount, accounts }: AccountListProps) => {
  return (
    <div style={styles.card}>
      <h1 style={styles.title}>Bienvenido</h1>
      <div style={{ ...styles.content, marginBottom: 20 }}>
        ¿A qué perfil deseas ingresar?{" "}
      </div>
      <Space wrap size={16}>
        {accounts.map((account) => (
          <div style={styles.cardAccount} key={account.id}>
            <Avatar
              key={account.idpaciente}
              size={65}
              src={profileImg(account.id, account.idpaciente, account.imagen)}
              onClick={() => handleSelectAccount(account)}
              style={{
                borderColor: colors.colorPrimary,
                borderWidth: 2,
                marginBottom: 0,
              }}
            />
            <div style={styles.content}>
              {account.nombre}
              {account.apellido ? ` ${account.apellido}` : ""}
            </div>
          </div>
        ))}
      </Space>
    </div>
  );
};

export default AccountList;

const styles: { [key: string]: CSSProperties } = {
  card: {
    height: "100%",
    overflow: "auto",
    minWidth: "400px",
    maxWidth: "calc(100vw - 700px)",
    margin: "auto",
    borderRadius: "30px",
    padding: "20px",
    backgroundColor: "#fff",
    flexDirection: "column",
    boxShadow: "2px 2px 10px 0px rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  title: {
    marginBottom: 10,
    color: colors.colorPrimary,
    textAlign: "center" as "center",
    fontSize: 20,
    fontWeight: "bold" as "bold",
  },
  content: {
    color: colors.colorPrimary,
    textAlign: "center" as "center",
    fontSize: 16,
  },
  cardList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 20,
  },
  cardAccount: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    cursor: "pointer",
    marginLeft: 10,
    marginRight: 10,
  },
};
