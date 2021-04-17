const PDF = require('pdfkit');
const fs = require('fs');
const open = require('open');
var random = require('random-seed').create();
var constantes = require('./constantes');


exports.pdfWriter = () => {

    const number = random(1000);

    const exame = new PDF();

    exame.pipe(fs.createWriteStream(`pdf/exame-${number}.pdf`));

    exame.font('fonts/arial.ttf').fontSize(9);

    //confeccção do pdf
    exame.image('img/logo.png', {scale: 0.1, align: 'left', valign: 'top'})
    exame.moveDown().moveTo(exame.x, exame.y).lineTo(540, exame.y).lineWidth(0.5).stroke();

    exame.moveDown();
    exame.text(`Nome do Paciente: ${constantes.nome}`);

    exame.moveDown();
    exame.text(`Data da Realização: ${constantes.data_realizacao}`);

    exame.moveDown();
    exame.text(`Nome do Médico: ${constantes.medico}`);

    exame.moveDown();
    exame.text(`Recomendações: ${constantes.recomendacoes}`);

    exame.end();

    this.openPDF(number);

}

exports.openPDF = (number) => {
    open(`pdf/exame-${number}.pdf`);
}


