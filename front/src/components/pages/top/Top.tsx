import { memo, VFC, useEffect } from "react";
import { Box } from "@chakra-ui/react";

import { HeaderLayout } from "../../templates/HeaderLayout";
import { useUserApi } from "../../../hooks/user/useUserApi";
import { useRequestHeader } from "../../../hooks/user/useRequestHeader";
import logo from "../../../assets/mealoor_logo.png";

export const Top: VFC = memo(() => {
  const { isLogin } = useUserApi();
  const { hasRequestHeader } = useRequestHeader();

  useEffect(() => {
    if (hasRequestHeader()) {
      isLogin();
    }
  }, []);

  return (
    <HeaderLayout>
      <Box className="top" as="article" h="100%" w="100%">
        <div className="white">
          <div>
            <h1>自炊による食費節約・健康管理をサポート！</h1>
            <img src={logo} alt="ロゴ" />
            <p>
              「食費の節約」や「健康のため」という理由で
              自炊をされている方に向けのアプリです
            </p>
            <p>
              mealoorを使うことで自炊で使う食材の管理、
              作った料理の金額やカロリーを計算できます
            </p>
            <p>
              さらに日々の体調・食事を記録でき、
              グラフによる体調と食事の変化を確認できます
            </p>
            <p>
              mealoorを活用して食費を節約しながら、健康的な食事をお楽しみください！
            </p>
          </div>
        </div>
      </Box>
    </HeaderLayout>
  );
});
