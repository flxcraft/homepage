import Block from "components/services/widget/block";
import Container from "components/services/widget/container";
import { useTranslation } from "next-i18next/pages";

import useWidgetAPI from "utils/proxy/use-widget-api";

export default function Component({ service }) {
  const { widget } = service;
  const { data: serverData, error: serverError } = useWidgetAPI(widget, "status");
  const { t } = useTranslation();

  if (serverError) {
    return <Container service={service} error={serverError} />;
  }
  if (!serverData) {
    return (
      <Container service={service}>
        <Block label="minecraft.status" />
        <Block label="minecraft.players" />
        <Block label="minecraft.version" />
        <Block label="minecraft.latency" />
      </Container>
    );
  }

  const statusIndicator = serverData.online ? t("minecraft.up") : t("minecraft.down");
  const players = serverData.players ? `${serverData.players.online} / ${serverData.players.max}` : "-";
  const version = serverData.version || "-";
  const latency = serverData.latency != null ? `${serverData.latency} ms` : "-";

  return (
    <Container service={service}>
      <Block label="minecraft.status" value={statusIndicator} />
      <Block label="minecraft.players" value={players} />
      <Block label="minecraft.version" value={version} />
      <Block label="minecraft.latency" value={latency} />
    </Container>
  );
}
