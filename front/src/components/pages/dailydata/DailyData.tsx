import { memo, VFC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { DefaultModal } from "../../molecules/layout/DefaultModal";
import { DefaultDialog } from "../../molecules/layout/DefaultDialog";
import { EatDataArea } from "../../organisms/dailydata/EatDataArea";
import { EatEditForm } from "../../organisms/eat/EatEditForm";
import { SigninHeaderLayout } from "../../templates/SigninHeaderLayout";
import { useMessage } from "../../../hooks/common/useMessage";
import { useDailyDataApi } from "../../../hooks/dailydata/useDailyDataApi";
import { useEatApi } from "../../../hooks/eat/useEatApi";
import { Eat } from "../../../types/api/eat";

type UrlParams = {
  date: string;
};

export const DailyData: VFC = memo(() => {
  const { date } = useParams<UrlParams>();
  const { showMessage } = useMessage();
  const { getDailyData, eatData, setEatData } = useDailyDataApi();
  const { deleteEat } = useEatApi();

  const [loading, setLoading] = useState(false);
  const [eatEditFormIsOpen, setEatEditFormIsOpen] = useState(false);
  const [eatDeleteDialogIsOpen, setEatDeleteDialogIsOpen] = useState(false);
  const [editEat, setEditEat] = useState<Eat | null>(null);
  const [deleteEatData, setDeleteEatData] = useState<Eat | null>(null);
  const [eatEditFormTitle, setEatEditFormTitle] = useState("");
  const [eatDeleteConfirmMessage, setEatDeleteConfirmMessage] = useState("");

  const updateEatDataInDailyData = (eat: Eat) => {
    if (eat.eat_date === date && eatData) {
      const tmpEatData = [...eatData];
      const index = tmpEatData.findIndex((data) => data.id === eat.id);
      if (index > -1) {
        tmpEatData[index] = eat;
      } else {
        tmpEatData.push(eat);
      }
      setEatData([...tmpEatData]);
    }
  };

  const openEatEditModal = (editMode = false) => {
    let title = "";
    if (editMode) {
      title = "食事編集";
    } else {
      setEditEat(null);
      title = "食事登録";
    }
    setEatEditFormTitle(title);
    setEatEditFormIsOpen(true);
  };

  const onClickEatNameLink = (id = 0) => {
    if (eatData) {
      const index = eatData.findIndex((data) => data.id === id);
      let selectedEat: Eat | null = null;
      let editMode = false;
      if (index > 0) {
        selectedEat = eatData[index];
        editMode = true;
      }
      setEditEat(selectedEat);
      openEatEditModal(editMode);
    } else {
      showMessage({ title: "選択された食事データを開くことができません", status: "error" });
    }
  };

  const onClickDeleteButton = (id: number) => {
    if (eatData) {
      const targetEat = eatData.find((data) => data.id === id);
      if (targetEat) {
        setDeleteEatData(targetEat);
        setEatDeleteConfirmMessage(`食事データ ${targetEat.eat_timing}の${targetEat.name}を削除します。よろしいですか？`);
        setEatDeleteDialogIsOpen(true);
      }
    }
  };

  const callDeleteEatData = () => {
    if (deleteEatData) {
      deleteEat(deleteEatData.id)
        .then(() => {
          showMessage({ title: "食事データの削除に成功しました", status: "success" });
          if (eatData) {
            const tmpEatData = eatData;
            const index = tmpEatData.findIndex((data) => data.id === deleteEatData.id);
            if (index > -1) {
              tmpEatData.splice(index, 1);
              setEatData([...tmpEatData]);
            }
          }
          setEatDeleteDialogIsOpen(false);
        })
        .catch(() => {
          showMessage({ title: "食事データの削除に失敗しました", status: "error" });
        });
    } else {
      showMessage({
        title: "選択した食事データが削除できません。管理者に問い合わせしてください",
        status: "error",
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    getDailyData(date)
      .catch(() => {
        showMessage({ title: "データの取得に失敗しました", status: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <SigninHeaderLayout loading={loading} title={`デイリーデータ：${date}`}>
      <Box as="article" w="100%" h="100%">
        デイリーデータの画面
        <EatDataArea
          eatData={eatData}
          openEditModal={openEatEditModal}
          onClickEatNameLink={onClickEatNameLink}
          onClickDeleteButton={onClickDeleteButton}
        />
      </Box>
      <DefaultModal
        isOpen={eatEditFormIsOpen}
        onClose={() => { setEatEditFormIsOpen(false); }}
        modalTitle={eatEditFormTitle}
        size="4xl"
      >
        <EatEditForm eat={editEat} setEatData={updateEatDataInDailyData} />
      </DefaultModal>
      <DefaultDialog
        isOpen={eatDeleteDialogIsOpen}
        headerTitle="食事データ削除確認"
        onClose={() => { setEatDeleteDialogIsOpen(false); }}
        onClick={callDeleteEatData}
      >
        {eatDeleteConfirmMessage}
      </DefaultDialog>
    </SigninHeaderLayout>
  );
});
